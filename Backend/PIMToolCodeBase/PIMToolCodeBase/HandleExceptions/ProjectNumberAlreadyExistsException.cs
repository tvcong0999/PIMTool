using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.HandleExceptions
{
    public class ProjectNumberAlreadyExistsException : Exception
    {
        public ProjectNumberAlreadyExistsException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
