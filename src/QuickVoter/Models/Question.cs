using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace QuickVoter.Models
{
    public class Question
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public List<Answer> Answers { get; set; }
    }

    public class Answer
    {
        public int Id { get; set; }

        public string Text { get; set; }
        
        public int Votes { get; set; }
    }

    public class QuestionContext : DbContext
    {
        public DbSet<Question> Questions { get; set; }
    }
}