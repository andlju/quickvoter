using SignalR.Hubs;

namespace QuickVoter.Controllers
{
    public class QuestionHub : Hub
    {
        public void RegisterForQuestion(int questionId)
        {
            Groups.Add(Context.ConnectionId, "Question_" + questionId);
        }
    }
}