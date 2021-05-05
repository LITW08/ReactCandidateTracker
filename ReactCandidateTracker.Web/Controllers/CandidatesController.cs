using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactCandidateTracker.Data;
using ReactCandidateTracker.Web.ViewModels;

namespace ReactCandidateTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private string _connectionString;

        public CandidatesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("add")]
        public void AddCandidate(Candidate candidate)
        {
            var repo = new CandidateRepository(_connectionString);
            repo.AddCandidate(candidate);
        }

        [HttpGet]
        [Route("pending")]
        public List<Candidate> GetPending()
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetCandidates(Status.Pending);
        }

        [HttpGet]
        [Route("get")]
        public Candidate GetCandidate(int id)
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetCandidate(id);
        }

        [HttpPost]
        [Route("updatestatus")]
        public void UpdateStatus(UpdateStatusViewModel viewModel)
        {
            var manager = new CandidateRepository(_connectionString);
            manager.UpdateStatus(viewModel.Id, viewModel.Status);
        }

        [HttpGet]
        [Route("confirmed")]
        public List<Candidate> GetConfirmed()
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetCandidates(Status.Confirmed);
        }

        [HttpGet]
        [Route("refused")]
        public List<Candidate> GetRefused()
        {
            var repo = new CandidateRepository(_connectionString);
            return repo.GetCandidates(Status.Refused);
        }

        [HttpGet]
        [Route("getcounts")]
        public CandidateCounts GetCounts()
        {
            var manager = new CandidateRepository(_connectionString);
            return manager.GetCounts();
        }

    }
}