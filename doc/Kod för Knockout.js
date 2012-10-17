/*
Kod för Knockout
----------------

Skapa enkel vymodell för Answer
*/

        // View Model for Answers
        function AnswerViewModel(model) {
            var self = this;

            self.votes = 5;
            self.text = "Dubstep";
        }



/*
Refactoring av vymodell - ta emot model
*/

        // View Model for Answers
        function AnswerViewModel(model) {
            var self = this;

            // Get initial number of votes and answer text from the Model
            self.votes = model.Votes;
            self.text = model.Text;
        }





/*
Lägg till vymodell för Question
*/

        // View Model for Questions
        function QuestionViewModel(model) {
            var self = this;

            // Get initial text from the Model
            self.text = model.Text; 

            // Map all answers from an Answer Model into Answer View Models
            self.answers = $.map(model.Answers, function(el) { return new AnswerViewModel(el); });
        }


/*
Alla vymodeller med indata
*/


        // View Model for Answers
        function AnswerViewModel(model) {
            var self = this;

            // Get initial number of votes and answer text from the Model
            self.votes = model.Votes;
            self.text = model.Text;
        }
        

        // View Model for Questions
        function QuestionViewModel(model) {
            var self = this;

            // Get initial text from the Model
            self.text = model.Text;

            // Map all answers from an Answer Model into Answer View Models
            self.answers = $.map(model.Answers, function (el) { return new AnswerViewModel(el); });
        }

        $(function() {

            // Create the main View Model for this page
            var pageViewModel = new QuestionViewModel({
                Text: "Vilken musik lyssnar du helst på när du kodar?",
                Answers: [
                    { Text: "Dubstep", Votes: 6 },
                    { Text: "Metal", Votes: 3 },
                    { Text: "Klassiskt", Votes: 2 },
                    { Text: "Eurodisco", Votes: 1 }
                ]
            });
            ko.applyBindings(pageViewModel);
            
        });



/*
Click-hantering
*/

        // View Model for Answers
        function AnswerViewModel(model) {
            var self = this;

            // Get initial number of votes and answer text from the Model
            self.votes = ko.observable(model.Votes);
            self.text = model.Text;

            // Add a vote
            self.addVote = function () {
                alert("Voted!");
            };
        }


/*
Introducera Observables
*/

        // View Model for Answers
        function AnswerViewModel(model) {
            var self = this;

            // Get initial number of votes and answer text from the Model
            self.votes = ko.observable(model.Votes);
            self.text = model.Text;

            // Add a vote
            self.addVote = function () {
                // Get the current number of votes
                var currentVotes = self.votes();
                // Increase by one
                currentVotes = currentVotes + 1;
                // Set the new value
                self.votes(currentVotes);
            };
        }


/*
Databind rutan för nytt svar
*/

        // View Model for Questions
        function QuestionViewModel(model) {
            var self = this;

            // Get initial text from the Model
            self.text = model.Text;

            // Map all answers from an Answer Model into Answer View Models
            self.answers = ko.observableArray($.map(model.Answers, function (el) { return new AnswerViewModel(el); }));
            
            // Text for new answer
            self.newAnswer = ko.observable();

            // Add a new answer
            self.addAnswer = function () {
                // Create a new Answer View Model using the current value of the new answer textbox
                var a = new AnswerViewModel({ Text: self.newAnswer(), Votes: 1 });
                // Push it to the current list of answers
                self.answers.push(a);
                // Clear the textbox
                self.newAnswer('');
            };
        }





/*
Visa vilket svar som leder
*/

        // View Model for Questions
        function QuestionViewModel(model) {
            var self = this;

            // Get initial text from the Model
            self.text = model.Text;

            // Map all answers from an Answer Model into Answer View Models
            self.answers = ko.observableArray($.map(model.Answers, function (el) { return new AnswerViewModel(el); }));
            
            // Text for new answer
            self.newAnswer = ko.observable();

            // Add a new answer
            self.addAnswer = function () {
                // Create a new Answer View Model using the current value of the new answer textbox
                var a = new AnswerViewModel({ Text: self.newAnswer(), Votes: 1 });
                // Push it to the current list of answers
                self.answers.push(a);
                // Clear the textbox
                self.newAnswer('');
            };

            // Returns the currently leading answer
            self.getLeadingAnswer = function () {
                var leadingAnswer = null;
                
                for (var i = 0; i < self.answers().length; i++) {
                    var a = self.answers()[i];
                    // Does this answer have more votes than the previously leading one? 
                    if (leadingAnswer == null || leadingAnswer.votes() < a.votes())
                        leadingAnswer = a; // Then it's now in the lead!
                }
                return leadingAnswer;
            };

            // A computed property
            self.leadingAnswer = ko.computed(self.getLeadingAnswer);
        }


// data-bind="css : { leading : $parent.leadingAnswer() == $data }"


/*************************/
/*          API          */
/*************************/

/*
Introducera PageViewModel för att hålla i sidans flöde och ladda in en fråga från API:et
*/


        function PageViewModel() {
            var self = this;
            
            // The current question for this page
            self.currentQuestion = ko.observable();

            // Refresh the current question from the api
            self.refresh = function () {
                // Load it
                QuickVoter.Questions.loadQuestion(@ViewBag.QuestionId).
                    done(function (m) {
                        // Create a new View Model and make it the current question
                        var q = new QuestionViewModel(m);
                        self.currentQuestion(q);
                    });
            };
        }

/* 
Runt html-koden

<!-- ko with: currentQuestion -->

<!-- /ko -->

*/


/*
Spara nya svar
*/

        // View Model for Questions
        function QuestionViewModel(model) {
            var self = this;

            // Store the id of the question
            self.id = model.Id;
            
            // Get initial text from the Model
            self.text = model.Text;

            // Map all answers from an Answer Model into Answer View Models
            self.answers = ko.observableArray($.map(model.Answers, function (el) { return new AnswerViewModel(el); }));
            
            // Text for new answer
            self.newAnswer = ko.observable();

            self.answerAdded = function(m) {
                // Create a new Answer View Model using the current value of the new answer textbox
                var a = new AnswerViewModel(m);
                // Push it to the current list of answers
                self.answers.push(a);
            };
            
            // Add a new answer
            self.addAnswer = function () {
                // Add the answer using the API. 
                QuickVoter.Questions.addAnswer(self.id, { Text: self.newAnswer(), Votes: 1 }).
                    done(self.answerAdded); // When done, send it to the answerAdded function.
                
                // Clear the textbox
                self.newAnswer('');
            };

            // Returns the currently leading answer
            self.getLeadingAnswer = function () {
                var leadingAnswer = null;
                
                for (var i = 0; i < self.answers().length; i++) {
                    var a = self.answers()[i];
                    // Does this answer have more votes than the previously leading one? 
                    if (leadingAnswer == null || leadingAnswer.votes() < a.votes())
                        leadingAnswer = a; // Then it's now in the lead!
                }
                return leadingAnswer;
            };

            // A computed property
            self.leadingAnswer = ko.computed(self.getLeadingAnswer);
        }




/*
Spara röstningar
*/

        // View Model for Answers
        function AnswerViewModel(questionId, model) {
            var self = this;

            // Store the id of the answer
            self.id = model.Id;
            
            // Get initial number of votes and answer text from the Model
            self.votes = ko.observable(model.Votes);
            self.text = model.Text;

            self.votesUpdated = function(m) {
                self.votes(m.Votes);
            };
            
            // Add a vote
            self.addVote = function () {
                QuickVoter.Questions.addVote(questionId, self.id).
                    done(self.votesUpdated);
            };
        }
        

        // View Model for Questions
        function QuestionViewModel(model) {
            var self = this;

            // Store the id of the question
            self.id = model.Id;
            
            // Get initial text from the Model
            self.text = model.Text;

            // Map all answers from an Answer Model into Answer View Models
            self.answers = ko.observableArray($.map(model.Answers, function (el) { return new AnswerViewModel(self.id, el); }));
            
            // Text for new answer
            self.newAnswer = ko.observable();

            self.answerAdded = function(m) {
                // Create a new Answer View Model using the current value of the new answer textbox
                var a = new AnswerViewModel(self.id, m);
                // Push it to the current list of answers
                self.answers.push(a);
            };
            
            // Add a new answer
            self.addAnswer = function () {
                // Add the answer using the API. 
                QuickVoter.Questions.addAnswer(self.id, { Text: self.newAnswer(), Votes: 1 }).
                    done(self.answerAdded); // When done, send it to the answerAdded function.
                
                // Clear the textbox
                self.newAnswer('');
            };

            // Returns the currently leading answer
            self.getLeadingAnswer = function () {
                var leadingAnswer = null;
                
                for (var i = 0; i < self.answers().length; i++) {
                    var a = self.answers()[i];
                    // Does this answer have more votes than the previously leading one? 
                    if (leadingAnswer == null || leadingAnswer.votes() < a.votes())
                        leadingAnswer = a; // Then it's now in the lead!
                }
                return leadingAnswer;
            };

            // A computed property
            self.leadingAnswer = ko.computed(self.getLeadingAnswer);
        }



/*
Lista frågor dynamiskt och lägg till nya frågor.
*/

        // Main view model for the questions list page
        function PageViewModel() {
            var self = this;

            // The list of questions
            self.questions = ko.observableArray([]);

            // Function to refresh the list
            self.refresh = function () {
                // Load from the API
                QuickVoter.Questions.loadQuestions().
                    done(function (m) {
                        // When loaded, map each Model element to a View Model
                        var qs = $.map(m, function (el) { return new QuestionViewModel(el); });
                        // And populate the list
                        self.questions(qs);
                    });
            };

            // Textbox for new question
            self.newQuestion = ko.observable();

            // A question should be added to the list
            self.questionAdded = function(m) {
                var q = new QuestionViewModel(m);
                self.questions.push(q);
            };

            // Add a new question
            self.addQuestion = function () {
                // Send it to the api
                QuickVoter.Questions.addQuestion({ Text: self.newQuestion(), Answers: [] }).
                    done(self.questionAdded); // Add the newly created question

                // Clear the textbox
                self.newQuestion('');
            };
            
        }



/*
Koppla upp mot QuestionHub
*/

        // Main view model for the questions list page
        function PageViewModel() {
            var self = this;

            // The list of questions
            self.questions = ko.observableArray([]);

            // Function to refresh the list
            self.refresh = function () {
                // Load from the API
                QuickVoter.Questions.loadQuestions().
                    done(function (m) {
                        // When loaded, map each Model element to a View Model
                        var qs = $.map(m, function (el) { return new QuestionViewModel(el); });
                        // And populate the list
                        self.questions(qs);
                    });
            };

            // Textbox for new question
            self.newQuestion = ko.observable();

            // A question should be added to the list
            self.questionAdded = function(m) {
                var q = new QuestionViewModel(m);
                self.questions.push(q);
            };

            // Add a new question
            self.addQuestion = function () {
                // Send it to the api
                QuickVoter.Questions.addQuestion({ Text: self.newQuestion(), Answers: [] });

                // Clear the textbox
                self.newQuestion('');
            };
            
        }

        $(function() {
            var pageViewModel = new PageViewModel();
            pageViewModel.refresh();
            ko.applyBindings(pageViewModel);

            var hub = $.connection.questionHub;
            hub.questionAdded = pageViewModel.questionAdded;
            
            $.connection.hub.logging = true;
            $.connection.hub.start();
            
        });


        