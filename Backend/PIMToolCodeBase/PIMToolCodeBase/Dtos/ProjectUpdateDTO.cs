using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Dtos
{
    public class ProjectUpdateDto
    {
        public int Id
        {
            get;
            set;
        }
        public int GroupId
        {
            get;
            set;
        }
        public int ProjectNumber
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public string Customer
        {
            get;
            set;
        }
        public Status Status
        {
            get;
            set;
        }
        public DateTime StartDate
        {
            get;
            set;
        }

        public DateTime? FinishDate
        {
            get;
            set;
        }
        public int[] EmployeeIds
        {
            get;
            set;
        }
    }
}
