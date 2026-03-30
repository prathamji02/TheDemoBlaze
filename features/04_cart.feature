Feature: End-to-End Checkout

  Scenario: Complete user journey from login to purchase
    Given I am a logged-in user
    And I have added "Sony vaio i5" to my cart
    When I view the cart and proceed to "Place Order"
    And I fill out the purchase modal with my details
    And I click the "Purchase" button
    Then I should see a "Thank you for your purchase!" confirmation message
