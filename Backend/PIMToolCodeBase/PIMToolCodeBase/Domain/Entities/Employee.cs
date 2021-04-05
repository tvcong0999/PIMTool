using System;
using System.Collections.Generic;

namespace PIMToolCodeBase.Domain.Entities
{
    public class Employee : BaseEntity
    {
        public string Visa
        {
            get;
            set;
        }
        public string FirstName
        {
            get;
            set;
        }
        public string LastName
        {
            get;
            set;
        }
        public DateTime BirthDay
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
        public ICollection<Project> Projects
        {
            get;
            set;
        }

    }
}
