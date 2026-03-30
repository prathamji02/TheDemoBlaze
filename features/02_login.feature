Feature: Shopping Flow

  Scenario: Filter products by category and add an item to the cart
    Given I am on the DemoBlaze homepage
    When I filter by the "Laptops" category
    Then I should see the "Sony vaio i5" in the product list
    When I click on the "Sony vaio i5" product
    And I click the "Add to cart" button
    Then I should see a "Product added." confirmation alert
