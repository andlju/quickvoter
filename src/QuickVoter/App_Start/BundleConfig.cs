using System.Web;
using System.Web.Optimization;

namespace QuickVoter
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-{version}.js"));

            // Knockout
            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                        "~/Scripts/knockout-{version}.js"));

            // Twitter Bootstrap scripts
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/bootstrap*"));

            // Application-specific scripts
            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                        "~/Scripts/app/*.js"));

            // Test scripts
            bundles.Add(new ScriptBundle("~/bundles/app/tests").Include(
                        "~/Scripts/app/tests/*.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            // Twitter Bootstrap CSS (Cerulean theme from http://bootswatch.com/)
            bundles.Add(new StyleBundle("~/Content/bootstrap").Include("~/Content/bootstrap-cerulean.css"));
            bundles.Add(new StyleBundle("~/Content/bootstrap-responsive").Include("~/Content/bootstrap-responsive*"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}