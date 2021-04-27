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
        Project GetInclude(int id);
        void Attach(Project project);
        // IEnumerable<Project> GetHaveCondition(string input, string status, int page);
        IEnumerable<Project> GetByIds(params int[] ids);
        bool ValidateProjectNumber(int projectNumber);
    }
}
