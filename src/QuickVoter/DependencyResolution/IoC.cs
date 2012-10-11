using System;
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

    }
}