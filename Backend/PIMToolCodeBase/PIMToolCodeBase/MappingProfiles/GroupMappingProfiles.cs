using AutoMapper;
using PIMToolCodeBase.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PIMToolCodeBase.MappingProfiles
{
    public class GroupMappingProfiles:Profile
    {
        public GroupMappingProfiles() : base(nameof(GroupMappingProfiles))
        {
            CreateMap<Group, GroupDto>().ReverseMap();
        }
    }
}
