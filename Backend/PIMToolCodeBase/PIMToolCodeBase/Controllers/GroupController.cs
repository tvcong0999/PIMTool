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

namespace PIMToolCodeBase.Controllers
{
    public class GroupController:BaseController
    {
        private readonly IMapper _mapper;
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService, IMapper mapper)
        {
            _mapper = mapper;
            _groupService = groupService;
        }
        [HttpGet]
        public IEnumerable<GroupDto> GetAll()
        {
            return _mapper.Map<IEnumerable<Group>, IEnumerable<GroupDto>>(_groupService.Get());
        }
    }
}
