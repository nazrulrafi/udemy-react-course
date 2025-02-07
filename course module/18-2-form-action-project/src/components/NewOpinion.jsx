import {use, useActionState} from "react";
import {OpinionsContext} from "../store/opinions-context.jsx";
import Submit from "./Submit.jsx";

export function NewOpinion() {
  const {addOpinion} = use(OpinionsContext);
  // Action function to handle form validation and submission logic
  async function shareOpinionAction(prevState, formData) {
    const title = formData.get("title");
    const userName = formData.get("userName");
    const body = formData.get("body");

    // Validation rules
    let errors = [];
    if (title.trim().length < 5) {
      errors.push("Title must be at least 5 characters.");
    }
    // if (body.trim().length < 10 || body.trim().length > 100) {
    //   errors.push("Body must be between 10 and 100 characters.");
    // }
    if (!userName.trim()) {
      errors.push("User name is required.");
    }

    // Return errors and current values for display
    if (errors.length > 0) {
      return {
        errors: errors,
        enteredValues: {
          title,
          userName,
          body,
        },
      };
    }

    await addOpinion({title,body,userName});

    return { errors: null };
  }

  // useActionState hook
  const [formState, formAction, pending] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
      <div id="new-opinion">
        <h2>Share your opinion!</h2>
        <form action={formAction}>
          <div className="control-row">
            <p className="control">
              <label htmlFor="userName">Your Name</label>
              <input
                  type="text"
                  id="userName"
                  name="userName"
                  defaultValue={formState.enteredValues?.userName}
              />
            </p>

            <p className="control">
              <label htmlFor="title">Title</label>
              <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={formState.enteredValues?.title}
              />
            </p>
          </div>
          <p className="control">
            <label htmlFor="body">Your Opinion</label>
            <textarea
                id="body"
                name="body"
                rows={5}
                defaultValue={formState.enteredValues?.body}
            ></textarea>
          </p>

          {/* Error Message Display */}
          {formState.errors && (
              <ul className="errors" aria-live="polite">
                {formState.errors.map((error, i) => (
                    <li key={i}>{error}</li>
                ))}
              </ul>
          )}

          <Submit/>
        </form>
      </div>
  );
}
