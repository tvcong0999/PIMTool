﻿using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using PIMToolCodeBase.Database;
using PIMToolCodeBase.Domain.Entities;

namespace PIMToolCodeBase.Repositories.Imp
{
    /// <summary>
    ///     Base of all repositories
    /// </summary>
    public abstract class BaseRepository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly PimContext _pimContext;
        protected readonly DbSet<T> Set;

        protected BaseRepository(PimContext pimContext)
        {
            _pimContext = pimContext;
            Set = _pimContext.Set<T>();
        }

        public IEnumerable<T> Get()
        {
            return Set;
        }

        public T Get(int id)
        {
            return Set.SingleOrDefault(x => x.Id == id);
        }

        public IEnumerable<T> Add(params T[] entities)
        {
            return Set.AddRange(entities);
        }

        public void Delete( params int[] ids)
        {
            var test = Set.Where(x => ids.Contains(x.Id)).ToList();
            Set.RemoveRange(Set.Where(x => ids.Contains(x.Id))) ;
        }

        public void Delete(params T[] entities)
        {
            Set.RemoveRange(entities);
            
        }

        public void SaveChange()
        {
            _pimContext.SaveChanges();
        }

        public void UnChange(T entity)
        {
            //Set.Attach(entity);
            _pimContext.Entry(entity).State = EntityState.Unchanged;

        }
        public void SetModified(T entity)
        {
            _pimContext.Entry(entity).State = EntityState.Modified;
        }

        public void UpdateRowVersion(T entity, byte[] timestamp)
        {
            _pimContext.Entry(entity).Property("TimeStamp").OriginalValue = timestamp;
        }
    }
}