using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using QuickVoter.Models;
using SignalR;

namespace QuickVoter.Controllers
{
    public class CreateQuestionCommand
    {
        public string Text { get; set; }

        public List<Answer> Answers { get; set; }
    }

    public class AddVoteCommand
    {
        public int QuestionId { get; set; }

        public int AnswerId { get; set; }
    }

    public class AddAnswerCommand
    {
        public string Text { get; set; }
        public int Votes { get; set; }
    }

    public class QuestionsController : ApiController
    {
        private readonly QuestionContext _context;

        public QuestionsController(QuestionContext context)
        {
            _context = context;
        }

        public List<Question> Get()
        {
            return _context.Questions.Include("Answers").ToList();
        }

        public Question Get(int id)
        {
            return _context.Questions.Include("Answers").FirstOrDefault(q => q.Id == id);
        }

        public Question Post(CreateQuestionCommand command)
        {
            var question = new Question
                               {
                                   Text = command.Text,
                                   Answers =
                                       command.Answers.Select((a, i) => new Answer() {  Text = a.Text, Votes = a.Votes}).ToList()
                               };

            _context.Questions.Add(question);
            _context.SaveChanges();

            return question;
        }
        
    }

    public class AnswersController : ApiController
    {

        private readonly QuestionContext _context;

        public AnswersController(QuestionContext context)
        {
            _context = context;
        }

        public Answer Post(int questionId, AddAnswerCommand command)
        {
            var question = _context.Questions.Include("Answers").First(q => q.Id == questionId);
            var nextId = question.Answers.Count;
            var newAnswer = new Answer() { Id = nextId, Text = command.Text, Votes = 1 };
            question.Answers.Add(newAnswer);
            
            _context.SaveChanges();
            
            return newAnswer;
        }

        [ActionName("vote")]
        public Answer Post(int questionId, int answerId)
        {
            var question = _context.Questions.Include("Answers").First(q => q.Id == questionId);
            var answer = question.Answers.Single(a => a.Id == answerId);
            answer.Votes++;
            
            _context.SaveChanges();

            return answer;
        }
    }
}