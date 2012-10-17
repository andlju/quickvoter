// View Model for Answers
function AnswerViewModel(questionId, model) {
    var self = this;

    // Store the id of the answer
    self.id = model.Id;

    // Get initial number of votes and answer text from the Model
    self.votes = ko.observable(model.Votes);
    self.text = model.Text;

    self.votesUpdated = function (m) {
        self.votes(m.Votes);
    };

    // Add a vote
    self.addVote = function () {
        QuickVoter.Questions.addVote(questionId, self.id);
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

    self.answerAdded = function (m) {
        // Create a new Answer View Model using the current value of the new answer textbox
        var a = new AnswerViewModel(self.id, m);
        // Push it to the current list of answers
        self.answers.push(a);
    };

    // Add a new answer
    self.addAnswer = function () {
        // Add the answer using the API. 
        QuickVoter.Questions.addAnswer(self.id, { Text: self.newAnswer(), Votes: 1 });

        // Clear the textbox
        self.newAnswer('');
    };

    // Update votes for a specific answer
    self.votesUpdated = function(m) {
        for (var i = 0; i < self.answers().length; i++) {
            var a = self.answers()[i];
            if (a.id == m.Id) {
                a.votesUpdated(m);
            }
        }
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
