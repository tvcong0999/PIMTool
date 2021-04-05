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
        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public Project Create(Project project)
        {
            var projects = _projectRepository.Add(project);
            _projectRepository.SaveChange();
            return projects.FirstOrDefault();
        }

        public IEnumerable<Project> Get()
        {
            return _projectRepository.GetInclude();
        }
    }
}
