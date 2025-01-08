import PropTypes from 'prop-types'
import '../overlay.css'
import './jobListingModal.css'
import { CloseIcon } from '@icons'
import IconButton from '@buttons/IconButton'
import StandardButton from '@buttons/StandardButton'
import Badge from '@badges/Badge'

function JobListingModal({ listing, onClose }) {
  const handleVisitJob = () => {
    window.open(listing.url, '_blank')
  }

  return (
    <div className="modal-overlay job-listing-modal">
      <div className="modal-content elevated">
        <div className="modal-header">
          <div style={{fontSize: 'var(--l)', fontWeight: '600'}}>{listing.job_title}</div>
          <IconButton icon={CloseIcon} onClick={onClose} type="squared" />
        </div>

        <div className="job-listing-content">
          <div className="job-listing-header">
            <div className="company-info">
              <h3 style={{fontSize: 'var(--m)', fontWeight: 'normal'}}>{listing.company}</h3>
              <div className="badges-container">
                <Badge text={listing.location} className="background-badge" />
                <Badge
                  text={listing.employment_type}
                  className="background-badge"
                />
                <Badge
                  text={`Posted: ${listing.listing_date}`}
                  className="background-badge"
                />
              </div>
            </div>
            <div className="job-meta">
              <Badge text={listing.salary == 'Not specified' ? 'Salary Not Specified' : listing.salary} className="primary-badge" />
            </div>
          </div>


          <div className="job-listing-body">
            <h4>Job Description</h4>
            <div className="description">
              {listing.description
                .split('\n')
                .map(
                  (paragraph, index) =>
                    paragraph.trim() && <p key={index}>{paragraph}</p>
                )}
            </div>
          </div>

          <div className="modal-footer">
            <StandardButton
              text="Visit Job Posting"
              onClick={handleVisitJob}
              className="standard-button"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

JobListingModal.propTypes = {
  listing: PropTypes.shape({
    site: PropTypes.string.isRequired,
    listing_date: PropTypes.string.isRequired,
    job_title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    employment_type: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default JobListingModal
