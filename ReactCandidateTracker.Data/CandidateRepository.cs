using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ReactCandidateTracker.Data
{
    public class CandidateRepository
    {
        private readonly string _connectionString;

        public CandidateRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Candidate> GetCandidates(Status status)
        {
            using var context = new CandidateTrackerContext(_connectionString);
            return context.Candidates.Where(c => c.Status == status).ToList();
        }

        public void AddCandidate(Candidate candidate)
        {
            using var context = new CandidateTrackerContext(_connectionString);
            context.Candidates.Add(candidate);
            context.SaveChanges();
        }

        public void UpdateStatus(int candidateId, Status status)
        {
            using var context = new CandidateTrackerContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(
                $"UPDATE Candidates SET Status = {status} WHERE Id = {candidateId}");
        }

        public CandidateCounts GetCounts()
        {
            using var context = new CandidateTrackerContext(_connectionString);
            return new CandidateCounts
            {
                Confirmed = context.Candidates.Count(c => c.Status == Status.Confirmed),
                Pending = context.Candidates.Count(c => c.Status == Status.Pending),
                Refused = context.Candidates.Count(c => c.Status == Status.Refused),
            };
        }

        public Candidate GetCandidate(int id)
        {
            using var context = new CandidateTrackerContext(_connectionString);
            return context.Candidates.FirstOrDefault(c => c.Id == id);
        }
    }
}