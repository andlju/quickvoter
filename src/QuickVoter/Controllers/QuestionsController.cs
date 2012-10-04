using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using QuickVoter.Models;
using Raven.Client;
using Raven.Client.Document;

namespace QuickVoter.Controllers
{
    public class CreateQuestionCommand
    {
        public string Text { get; set; }

        public List<string> Answers { get; set; }
    }

    public class AddVoteCommand
    {
        public int QuestionId { get; set; }

        public int AnswerId { get; set; }
    }

    public class AddAnswerCommand
    {
        public string Answer { get; set; }
    }

    public class QuestionsController : ApiController
    {
        private readonly IDocumentSession _session;

        public QuestionsController(IDocumentSession session)
        {
            _session = session;
        }

        public List<Question> Get()
        {
            return _session.Query<Question>().ToList();
        }

        public Question Get(int id)
        {
            return _session.Load<Question>(id);
        }

        public Question Post(CreateQuestionCommand command)
        {
            var question = new Question
                               {
                                   Text = command.Text,
                                   Answers =
                                       command.Answers.Select((a, i) => new Answer() {Id = i, Text = a, Votes = 0}).ToList()
                               };

            _session.Store(question);
            _session.SaveChanges();
            return question;
        }
        
    }

    public class AnswersController : ApiController
    {

        private readonly IDocumentSession _session;

        public AnswersController(IDocumentSession session)
        {
            _session = session;
        }

        public Answer Post(int questionId, AddAnswerCommand command)
        {
            var question = _session.Load<Question>(questionId);
            var nextId = question.Answers.Count;
            var newAnswer = new Answer() { Id = nextId, Text = command.Answer, Votes = 1 };
            question.Answers.Add(newAnswer);
            
            _session.Store(question);
            _session.SaveChanges();
            
            return newAnswer;
        }

        [ActionName("vote")]
        public Answer Post(int questionId, int answerId)
        {
            var question = _session.Load<Question>(questionId);
            var answer = question.Answers.Single(a => a.Id == answerId);
            answer.Votes++;
            _session.Store(question);
            _session.SaveChanges();
            return answer;
        }
    }
}