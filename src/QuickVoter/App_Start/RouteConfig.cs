﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace QuickVoter
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapHttpRoute(
                name: "AnswersActionApi",
                routeTemplate: "api/questions/{questionId}/answers/{answerId}/{action}",
                defaults: new { controller = "Answers", answerId = RouteParameter.Optional, action = RouteParameter.Optional }
            );

            routes.MapHttpRoute(
                name: "AnswersApi",
                routeTemplate: "api/questions/{questionId}/answers/{answerId}",
                defaults: new { controller = "Answers", answerId = RouteParameter.Optional }
            );

            routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}