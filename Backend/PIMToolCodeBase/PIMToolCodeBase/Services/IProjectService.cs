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
        Project GetDetail(int id);
        IEnumerable<Project> GetHaveCondition(string input, Status? status, int page, string columnSort,int orderSort);
        void Create(Project project);
        void DeleteProject(params int[] id);
        void UpdateProject(Project project);
        bool ValidateProjectNumber(int projectNumber);
        int CountProjects(string input, Status? status);
    }
}
