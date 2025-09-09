import { test, expect } from "@playwright/test";

// Use a consistent URL for your development server
const BASE_URL = "http://localhost:5173";

test.describe("Broker Dashboard E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard page before each test
    await page.goto(BASE_URL);

    // Wait for the main content to load by checking for a known element
    await expect(page.locator('h1:has-text("Pipeline")')).toBeVisible();
    await expect(page.locator('h2:has-text("Sarah Dunn")')).toBeVisible();
  });

  // Test Case 1: Borrower selection updates the center pane
  test("should display selected borrower details in the center pane", async ({
    page,
  }) => {
    // Find and click the borrower 'Lisa Carter' in the pipeline (left panel)
    await page.getByRole("tab", { name: "New" }).click();
    await page.getByText("Lisa Carter").click();

    // Wait for the details to update in the center pane
    // We expect the name and a specific loan amount to appear
    const borrowerDetails = page.locator("div.h-full.flex.flex-col").nth(1); // Select the second card on the page

    await expect(borrowerDetails.locator("h2")).toHaveText("Lisa Carter");
    await expect(
      borrowerDetails.locator('p:has-text("450,000")')
    ).toBeVisible();
    await expect(
      borrowerDetails.locator('p:has-text("Software Engineer")')
    ).toBeVisible();
  });

  // Test Case 2: Explainability section expands/collapses
  test("should expand and collapse the AI Explainability section", async ({
    page,
  }) => {
    // Click to expand the accordion
    const accordionTrigger = page.getByRole("button", {
      name: "AI Explainability",
    });
    await accordionTrigger.click();

    // Verify the accordion content is visible
    const accordionContent = page.locator("div.accordion-content");
    await expect(accordionContent).toBeVisible();
    await expect(accordionContent.locator("div").first()).toContainText(
      "Income Inconsistent with Bank statements"
    );

    // Click again to collapse the accordion
    await accordionTrigger.click();

    // Verify the accordion content is no longer visible
    await expect(accordionContent).not.toBeVisible();
  });

  // Test Case 3: Button clicks log appropriate console outputs
  test("should log correct messages to the console when buttons are clicked", async ({
    page,
  }) => {
    const messages = new Set<string>();

    // Listen for console messages and add them to our set
    page.on("console", (msg) => {
      messages.add(msg.text());
    });

    // Click to expand the accordion to make buttons visible
    await page.getByRole("button", { name: "AI Explainability" }).click();

    // Click all the action buttons
    await page.getByRole("button", { name: "Request Documents" }).click();
    await page.getByRole("button", { name: "Send to Valuer" }).click();
    await page.getByRole("button", { name: "Approve" }).click();

    // Click the final button outside the accordion
    await page
      .getByRole("button", { name: "Escalate to Credit Committee" })
      .click();

    // Wait for all messages to be received
    await page.waitForTimeout(1000);

    // Assert that the console messages contain the expected log outputs from your mock API
    expect(
      messages.has("[MOCK API] Requesting documents for borrower 1")
    ).toBeTruthy();
    expect(
      messages.has("[MOCK API] Sending borrower 1 to valuer")
    ).toBeTruthy();
    expect(
      messages.has("[MOCK API] Approving loan for borrower 1")
    ).toBeTruthy();
    expect(
      messages.has("[MOCK API] Escalating borrower 1 to credit committee")
    ).toBeTruthy();
  });
});
