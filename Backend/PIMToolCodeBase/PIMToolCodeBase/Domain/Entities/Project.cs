using System;
using System.Collections.Generic;

namespace PIMToolCodeBase.Domain.Entities
{
    public class Project : BaseEntity
    {
        public int GroupID
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
        public string Status
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
        public int Version
        {
            get;
            set;
        }
        public virtual Group Group
        {
            get;
            set;
        }
        public ICollection<Employee> Employees
        {
            get;
            set;
        }
        public enum EnumSts { NEW, PLA, INP, FIN }
        public EnumSts EnumStatus
        {
            get;
            set;
        }
    }
}
