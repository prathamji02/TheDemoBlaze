Feature: User Signup
  As a new user
  I want to create an account
  So that I can access personalized shopping features

  Scenario: Successful Signup with New Credentials
    Given I am on the Demoblaze homepage
    When I click the "Sign up" navigation link
    And I enter a unique username and password "Pass123!"
    And I click the "Sign up" button in the modal
    Then I should see the alert "Sign up successful."