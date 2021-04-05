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
        Project Create(Project project);

    }
}
