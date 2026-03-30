Feature: Cart Logic

  Scenario: Delete an item from the cart and verify price update
    Given I have added "Sony vaio i5" to the cart
    When I navigate to the "Cart" page
    And I see "Sony vaio i5" in the cart
    And I delete the "Sony vaio i5" from the cart
    Then the cart should be empty or reflect the item's removal
