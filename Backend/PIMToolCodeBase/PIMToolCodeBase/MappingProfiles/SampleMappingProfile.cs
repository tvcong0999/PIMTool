using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace PIMToolCodeBase.MappingProfiles
{
    public class SampleMappingProfile : Profile
    {
        public SampleMappingProfile() : base(nameof(SampleMappingProfile))
        {
            CreateMap<Sample, SampleDto>().ReverseMap();
            CreateMap<Project, ProjectDto>()
                .ReverseMap();

            CreateMap<Project, ProjectCreateDto>().ReverseMap();

            //CreateMap<Project, ProjectCreateDto>().ForMember(d => d.EmployeeIds,
            //opts => opts.MapFrom(s => s.ProjectEmployees
            //    .Select(pe => pe.EmployeeId).ToList())).ReverseMap();

            //CreateMap<ProjectCreateDto, Project>().ForMember(d => d.ProjectEmployees, opts =>
            //opts.MapFrom(s => new ProjectEmployee[]
            //{
            //    new ProjectEmployee{EmployeeId = s.EmployeeIds.FirstOrDefault()}

            //})).ReverseMap();

            CreateMap<ProjectCreateDto, Project>().AfterMap((s, d) => {
                d.ProjectEmployees = new List<ProjectEmployee>();
                foreach (int id in s.EmployeeIds) {
                    d.ProjectEmployees.Add(new ProjectEmployee { EmployeeId = id });
                } });
            CreateMap<Employee, EmployeeDto>()
                .ReverseMap();
            CreateMap<Group, GroupDto>().ReverseMap();

            CreateMap<ProjectEmployee, ProjectEmployeeDto>().ReverseMap();

            CreateMap<ProjectUpdateDto, Project>().AfterMap((s, d) => {
                d.ProjectEmployees = new List<ProjectEmployee>();
                foreach (int id in s.EmployeeIds)
                {
                    d.ProjectEmployees.Add(new ProjectEmployee { EmployeeId = id });
                }
            });
        }
    }
}