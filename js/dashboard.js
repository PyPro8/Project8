/* ==========================================================================
   Project 8 — dashboard.js
   Dashboard-only interactions (student + instructor)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* Create Course form (UI only) */
  const createCourseForm = document.getElementById('createCourseForm');
  if (createCourseForm) {
    createCourseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.showToast('Course draft saved successfully', 'fa-circle-check');
      createCourseForm.reset();
    });
  }

  /* Edit profile form (UI only) */
  const editProfileForm = document.getElementById('editProfileForm');
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.showToast('Profile updated successfully', 'fa-circle-check');
      const modal = editProfileForm.closest('.modal-overlay');
      if (modal) modal.classList.remove('show');
    });
  }

  /* Delete course confirm (UI only) */
  document.querySelectorAll('[data-delete-course]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.manage-course-row');
      if (row && confirm('Remove this course from your dashboard?')) {
        row.remove();
        window.showToast('Course removed', 'fa-trash');
      }
    });
  });

});
