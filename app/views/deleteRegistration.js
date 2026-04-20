export function deleteRegistrationView(data) {
    return `
    <main>
          <section id="delete-message">
            <p class="space-between">Are you sure you want to cancel your registration for the event <strong>"${data.event.event_name}"</strong>?</p>
            <p class="space-between">You can view your registrations again before cancelling.</p>
          </section>
    
          <div class="delete-btn-container">

            <button type="button" 
            onclick="location.href='/events/my-registrations'"
            class="delete-form-btns" id="cancel-btn">
            View Registrations
            </button>
    
            <form method="POST">
              <button type="submit" class="delete-form-btns" id="form-delete-btn">Cancel Registration</button>
            </form>
    
          </div>
    
    </main>
    `;
}