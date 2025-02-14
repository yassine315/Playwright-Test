Feature: Hotel page navigation visibility
  As a user visiting the hotel page
  I want the hotel navigation to behave based on my scroll direction
  So that my browsing experience is intuitive

  Scenario: Navigation hidden when scrolling down
    Given I am on the hotel page
    When I scroll down on the page
    Then the hotel navigation should not be displayed

  Scenario: Navigation visible when scrolling up
    Given I am on the hotel page
    When I scroll up on the page
    Then the hotel navigation should be displayed