Feature: Autocomplete step input    
    As a user
    I want step suggestion when i typing
    So that I can make sceanrios faster

    Scenario: Autocomplete when typing
        Given steps was created in other scenarios:
            | part           | step                 |
            | Zakładając, że | istnieje obiekt X    |
            | Zakładając, że | coś zostało zrobione |
            | Gdy            | istnieje coś         |
            | Wtedy          | nie istnieje coś     |
        And I am on page
        When I typing "istnieje" in "Zakładając, że" step
        Then I should see suggestion "istnieje obiekt X"
