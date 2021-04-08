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
        public byte[] TimeSpamp
        {
            get;
            set;
        }
        public ICollection<ProjectEmployee> ProjectEmployees
        {
            get;
            set;
        }

    }
}
