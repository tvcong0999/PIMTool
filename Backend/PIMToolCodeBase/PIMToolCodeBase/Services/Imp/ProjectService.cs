using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services.Imp
{
    public class ProjectService: BaseService, IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IEmployeeRepository _employeeRepository;
        public ProjectService(IProjectRepository projectRepository, IEmployeeRepository employeeRepository)
        {
            _projectRepository = projectRepository;
            _employeeRepository = employeeRepository;
        }

        public void Create(Project project)
        { 
            var projects = _projectRepository.Add(project);
            _projectRepository.SaveChange();
        }

        public void DeleteProject(params int[] id)
        {
            _projectRepository.Delete(id);
            _projectRepository.SaveChange();
        }

        public IEnumerable<Project> Get()
        {
            return _projectRepository.Get();
        }

        public IEnumerable<Project> GetHaveCondition(string input, Status status, int page)
        {
            return _projectRepository.Get().Where(p => (String.IsNullOrEmpty(input)
            || p.ProjectNumber.ToString() == input || p.Name.Contains(input) || p.Customer.Contains(input))
            && (String.IsNullOrEmpty(status.ToString()) || p.Status == status))
                .OrderBy(p => p.ProjectNumber).Skip((page - 1) * 5).Take(5).ToList();
        }
    }
}
