using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactCandidateTracker.Data;

namespace ReactCandidateTracker.Web.ViewModels
{
    public class UpdateStatusViewModel
    {
        public int Id { get; set; }
        public Status Status { get; set; }
    }
}
