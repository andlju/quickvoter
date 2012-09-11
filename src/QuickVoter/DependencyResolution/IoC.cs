using System;
using Raven.Client;
using Raven.Client.Document;
using StructureMap;
using StructureMap.Configuration.DSL;

namespace QuickVoter
{
    public static class IoC
    {
        public static IContainer Initialize()
        {
            ObjectFactory.Initialize(x =>
                                         {
                                             x.Scan(scan =>
                                                        {
                                                            scan.TheCallingAssembly();
                                                            scan.WithDefaultConventions();
                                                        });
                                             x.AddRegistry<QuickVoterRegistry>();
                                         });
            return ObjectFactory.Container;
        }
    }

    public class QuickVoterRegistry : Registry
    {
        public QuickVoterRegistry()
        {
            For<IDocumentStore>().Singleton().Use(CreateDocumentStore());
            For<IDocumentSession>().HybridHttpOrThreadLocalScoped().Use(
                ctxt => ctxt.GetInstance<IDocumentStore>().OpenSession()
                );
        }

        private IDocumentStore CreateDocumentStore()
        {
            var store = new DocumentStore() {Url = "http://localhost:8080"};
            store.Initialize();
            return store;
        }
    }
}