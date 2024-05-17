Feature: End to end Ecommerce validation

    This is an end to end test
    @Regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce page
    When I add items to the cart
    |Blackberry |
    |Nokia Edge |
    And Validate the total prices
    Then Select the country, submit and verify success message

    @Smoke
    Scenario: Filling the user details
    Given I open Ecommerce page
    When I fill the form details
    |name  | gender  |
    |Gayle | Female  |
    Then Validate the form behavior
    And click on the shop button

