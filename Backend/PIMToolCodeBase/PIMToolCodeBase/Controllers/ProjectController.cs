using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;
using PIMToolCodeBase.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper.QueryableExtensions;

namespace PIMToolCodeBase.Controllers
{
    public class ProjectController:BaseController
    {
        private readonly IMapper _mapper;
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService, IMapper mapper)
        {
            _projectService = projectService;
            _mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<ProjectDto> GetAll()
        {
            return _mapper.Map<IEnumerable<Project>, IEnumerable<ProjectDto>>(_projectService.Get());
        }

        [HttpGet]

        public IEnumerable<ProjectDto> GetHaveCondition(Status status, string input = null,  int page=1)
        {
            return _mapper.Map<IEnumerable<Project>, IEnumerable<ProjectDto>>(_projectService.GetHaveCondition(input, status, page));
        }

        [HttpPost]
        public void Create(ProjectCreateDto projectCreateDto)
        {
            _projectService.Create(_mapper.Map<ProjectCreateDto, Project>(projectCreateDto));
        }
        [HttpDelete]
        public void DeleteProject(params int[] id)
        {
            _projectService.DeleteProject(id);
        }
        [HttpPut]
        public void UpdateProject(ProjectUpdateDto projectCreateDto)
        {
            _projectService.UpdateProject(_mapper.Map<ProjectUpdateDto, Project>(projectCreateDto));
        }
    }
}
