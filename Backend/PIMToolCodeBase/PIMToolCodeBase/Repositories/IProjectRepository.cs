using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Repositories
{
    public interface IProjectRepository: IRepository<Project>
    {
        IEnumerable<Project> GetInclude();
        void Attach(Project project);
       // IEnumerable<Project> GetHaveCondition(string input, string status, int page);
    }
}
