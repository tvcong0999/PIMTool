using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIMToolCodeBase.Domain.Entities
{
    public class Project : BaseEntity
    {
        //[Key]
        //public new int ID
        //{
        //    get;
        //    set;
        //}
        [Required]
        public int GroupID
        {
            get;
            set;
        }
        [Required]
        public int ProjectNumber
        {
            get;
            set;
        }
        [Required, StringLength(50), Display(Name = "Project Name")]
        public string Name
        {
            get;
            set;
        }
        [Required, StringLength(50)]
        public string Customer
        {
            get;
            set;
        }
        [Required, StringLength(3)]
        public string Status
        {
            get;
            set;
        }
        [Required, Display(Name = "Start Date")]
        public DateTime StartDate
        {
            get;
            set;
        }

        [Display(Name = "Finish Date")]
        public DateTime FinishDate
        {
            get;
            set;
        }
        [Required]
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
    }
}
