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

        public Project Create(Project project)
        {
            var projects = _projectRepository.Add(project);
            foreach (var pro in projects)
            {
                foreach (var em in pro.Employees)
                {
                    var employee = _employeeRepository.Get(em.Id);
                    if (employee != null)
                    {
                        _employeeRepository.UnChanged(em);
                    }

                }

            }
                _projectRepository.SaveChange();
            return projects.FirstOrDefault();
        }

        public IEnumerable<Project> Get()
        {
            return _projectRepository.GetInclude();
        }
    }
}
