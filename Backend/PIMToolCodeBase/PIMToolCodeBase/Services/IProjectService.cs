using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services
{
    public interface IProjectService
    {
        IEnumerable<Project> Get();
        IEnumerable<Project> GetHaveCondition(string input, Status? status, int page);
        void Create(Project project);
        void DeleteProject(params int[] id);
        void UpdateProject(Project project);
    }
}
