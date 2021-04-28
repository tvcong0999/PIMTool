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
            CreateMap<Project, ProjectDto>();

            CreateMap<Project, ProjectDetailDto>().AfterMap((s,d)=>
            {
                d.EmployeeIds = new List<int>();
                foreach(var employee in s.ProjectEmployees)
                {
                    d.EmployeeIds.Add(employee.EmployeeId);
                }
            });

            CreateMap<ProjectDetailDto, Project>().AfterMap((s, d) =>
            {
                d.ProjectEmployees = new List<ProjectEmployee>();
                foreach (int id in s.EmployeeIds)
                {
                    d.ProjectEmployees.Add(new ProjectEmployee { EmployeeId = id });
                }
            });

            CreateMap<Project, ProjectCreateDto>().ReverseMap();


            CreateMap<ProjectCreateDto, Project>().AfterMap((s, d) => {
                d.ProjectEmployees = new List<ProjectEmployee>();
                foreach (int id in s.EmployeeIds) {
                    d.ProjectEmployees.Add(new ProjectEmployee { EmployeeId = id });
                } });
            CreateMap<Employee, EmployeeDto>()
                .ReverseMap();
            CreateMap<Group, GroupDto>().ReverseMap();

            CreateMap<ProjectEmployee, ProjectEmployeeDto>().ReverseMap();

            //CreateMap<ProjectDto, Project>().AfterMap((s, d) => {
            //    d.ProjectEmployees = new List<ProjectEmployee>();
            //    foreach (int id in s.EmployeeIds)
            //    {
            //        d.ProjectEmployees.Add(new ProjectEmployee { EmployeeId = id });
            //    }
            //});
        }
    }
}