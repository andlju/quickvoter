/*
Kod för Knockout
----------------

Skapa enkel vymodell för Answer
*/

        function AnswerViewModel() {
            var self = this;

            self.answerText = 'Le Café (Centralen)';
            self.votes = 7;
        }



/*
Refactoring av vymodell - ta emot model
*/

        function AnswerViewModel(model) {
            var self = this;

            self.answerText = model.text;
            self.votes = model.votes;
        }





/*
Lägg till vymodell för Question
*/

        function QuestionViewModel() {
            var self = this;

            self.questionText = 'Var ska vi träffas på nästa #kodkaffe?';
            self.answers = [
                new AnswerViewModel({ text: 'Le Café (Centralen)', votes: 7 }),
                new AnswerViewModel({ text: 'Espresso House', votes: 4 }),
                new AnswerViewModel({ text: 'Le Café (Stureplan)', votes: 3 })
            ];
        }



/*
Alla vymodeller med indata
*/

        function AnswerViewModel(model) {
            var self = this;

            self.answerText = model.text;
            self.votes = model.votes;
        }

        function QuestionViewModel(model) {
            var self = this;

            self.questionText = model.text;
            self.answers = $.map(model.answers, function(el) { return new AnswerViewModel(el); });
        }

        var questionModel = {
            text: 'Var ska vi träffas på nästa #kodkaffe?',
            answers: [
                { text: 'Le Café (Centralen)', votes: 7 },
                { text: 'EspressoHouse', votes: 4 },
                { text: 'Le Café (Stureplan)', votes: 3 },
                { text: 'Hemma hos Cecilia', votes: 4 }
            ]
        };
        
        var viewModel = new QuestionViewModel(questionModel);
        ko.applyBindings(viewModel);


/*
Click-hantering
*/

        function AnswerViewModel(model) {
            var self = this;

            self.answerText = model.text;
            self.votes = model.votes;

            self.vote = function () {
                self.votes = self.votes + 1;
                alert('Votes: ' + self.votes);
            };
        }


/*
Introducera Observables
*/

        function AnswerViewModel(model) {
            var self = this;

            self.answerText = model.text;
            self.votes = ko.observable(model.votes);

            self.vote = function () {
                self.votes(self.votes() + 1);
            };
        }



/*
Ruta för att lägga till nytt svar
*/

<div class="row">
    <div class="offset2 span8">
        <form action="#">
            <input type="text" class="input-large" />
            <input type="submit" class="btn btn-primary" value="New answer"/>
        </form>
    </div>
</div>




/*
Gör om till observableArray
*/

        function QuestionViewModel(model) {
            var self = this;

            self.questionText = model.text;
            self.answers = ko.observableArray($.map(model.answers, function(el) { return new AnswerViewModel(el); }));

            self.newAnswerText = ko.observable();

            self.addAnswer = function() {
                var answer = { text: self.newAnswerText(), votes: 1 };
                self.answers.push(new AnswerViewModel(answer));
                self.newAnswerText('');
            };
        }



/*************************/
/*          API          */
/*************************/

/*
Introducera PageViewModel för att hålla i sidans flöde och ladda in en fråga från API:et
*/

        function PageViewModel() {
            var self = this;

            self.question = ko.observable();

            self.refresh = function() {
                QuickVoter.Questions.loadQuestion(@ViewBag.QuestionId)
                    .done(function (res) {
                        var questionViewModel = new QuestionViewModel(res);
                        self.question(questionViewModel);
                    });
            };

            self.refresh();
        }


        var viewModel = new PageViewModel();

/* 
Runt html-koden

<!-- ko with: question -->

<!-- /ko -->

*/


/*
Spara nya svar
*/

        function QuestionViewModel(model) {
            var self = this;

            self.questionId = model.id;
            
            self.questionText = model.text;
            
            self.answers = ko.observableArray($.map(model.answers, function(el) { return new AnswerViewModel(el); }));

            self.newAnswerText = ko.observable();

            self.answerAdded = function (res) {
                self.answers.push(new AnswerViewModel(res));
            };
            
            self.addAnswer = function () {
                QuickVoter.Questions.addAnswer(self.questionId, { text: self.newAnswerText(), votes: 1 }).
                    done(answerAdded);
                self.newAnswerText('');
            };
        }


/*
Spara röstningar
*/


        function AnswerViewModel(questionId, model) {
            var self = this;
            
            self.answerText = model.text;
            self.votes = ko.observable(model.votes);

            self.votesUpdated = function(votes) {
                self.votes(votes);
            };

            self.vote = function () {
                QuickVoter.Questions.addVote(questionId, model.id).
                    done(function(res) {
                        self.votesUpdated(res.votes);
                    });
            };
        }

        function QuestionViewModel(model) {
            var self = this;

            self.questionId = model.id;
            
            self.questionText = model.text;
            
            self.answers = ko.observableArray($.map(model.answers, function(el) { return new AnswerViewModel(model.id, el); }));

            self.newAnswerText = ko.observable();

            self.answerAdded = function (res) {
                self.answers.push(new AnswerViewModel(model.id, res));
            };
            
            self.addAnswer = function () {
                QuickVoter.Questions.addAnswer(self.questionId, { text: self.newAnswerText(), votes: 1 }).
                    done(self.answerAdded);
                self.newAnswerText('');
            };
        }


/*
Lista frågor dynamiskt (Index-sidan)
*/
        function PageViewModel() {
            var self = this;

            self.questions = ko.observableArray([]);

            self.refresh = function() {
                QuickVoter.Questions.loadQuestions().
                    done(function (res) {
                        self.questions($.map(res, function(el) { return new QuestionViewModel(el); }));
                    });
            };
            self.refresh();
        }

        $(function() {
            var viewModel = new PageViewModel();
            ko.applyBindings(viewModel);
        });


/*
Koppla upp mot QuestionHub
*/

        function PageViewModel() {
            var self = this;

            self.question = ko.observable();

            self.hub = $.connection.questionHub;

            self.refresh = function() {
                QuickVoter.Questions.loadQuestion(@ViewBag.QuestionId)
                    .done(function (res) {
                        var questionViewModel = new QuestionViewModel(res);
                        self.question(questionViewModel);
                        self.hub.answerAdded = questionViewModel.answerAdded;
                    });
            };

            self.refresh();
        }
        
        var pageViewModel = new PageViewModel();
        ko.applyBindings(pageViewModel);
        $.connection.hub.start();


        