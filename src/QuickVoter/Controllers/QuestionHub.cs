using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalR.Hubs;

namespace QuickVoter.Controllers
{
    public class QuestionHub : Hub
    {
        public void SubscribeToQuestion(int questionId)
        {
            Groups.Add(Context.ConnectionId, "Question" + questionId);
        }
    }
}