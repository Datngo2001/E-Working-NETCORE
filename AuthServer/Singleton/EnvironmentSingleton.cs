using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthServer.Singleton
{
    public sealed class EnvironmentSingleton
    {
        public bool IsDevelopment { get; private set; } = false;

        private EnvironmentSingleton() { }

        private static EnvironmentSingleton? instance = null;

        public static EnvironmentSingleton GetInstance()
        {
            if (instance == null)
            {
                instance = new EnvironmentSingleton();
            }
            return instance;
        }

        public static void SetInstance(bool isDevelopment)
        {
            if (instance != null)
            {
                instance = new EnvironmentSingleton();
                instance.IsDevelopment = isDevelopment;
            }
        }
    }
}