// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setAvailableUsersAndAccounts: "done.invoke.ACL Dialog.Step 1.Loading users:invocation[0]";
    setWildcardAccount: "All accounts wildcard";
    setSelectedUsername: "Type username" | "Select user from list";
    setSelectedAccount: "Select service account from list";
    clearSelectedAccount: "Clear selection";
    addRawAcl: "Add ACL manually";
    addConsumeTopicTemplateAcl: "Add a consume from a topic ACL";
    addProduceTopicTemplateAcl: "Add a produce to a topic ACL";
    addManageAccessTemplateAcl: "Add manage access ACL";
  };
  internalEvents: {
    "done.invoke.ACL Dialog.Step 1.Loading users:invocation[0]": {
      type: "done.invoke.ACL Dialog.Step 1.Loading users:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadUsersAndServiceAccounts: "done.invoke.ACL Dialog.Step 1.Loading users:invocation[0]";
    loadACLs: "done.invoke.ACL Dialog.Step 2.load ACLs:invocation[0]";
    saveAcls: "done.invoke.ACL Dialog.Step 2.Saving:invocation[0]";
  };
  missingImplementations: {
    actions:
      | "setAvailableUsersAndAccounts"
      | "setWildcardAccount"
      | "setSelectedUsername"
      | "setSelectedAccount"
      | "clearSelectedAccount"
      | "addRawAcl"
      | "addConsumeTopicTemplateAcl"
      | "addProduceTopicTemplateAcl"
      | "addManageAccessTemplateAcl";
    services: "loadUsersAndServiceAccounts" | "loadACLs" | "saveAcls";
    guards:
      | "pristine"
      | "dirty"
      | "acls count == 0"
      | 'acl user matches the selected one in step 1 OR selected user is "all accounts"';
    delays: never;
  };
  eventsCausingServices: {
    loadUsersAndServiceAccounts: "xstate.init";
    loadACLs: "Next";
    saveAcls: "Save";
  };
  eventsCausingGuards: {
    pristine: "Cancel";
    dirty: "Cancel";
    "acls count == 0": "Delete ACL";
    'acl user matches the selected one in step 1 OR selected user is "all accounts"': "Delete existing ACL";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "Step 1"
    | "Step 1.Loading users"
    | "Step 1.Select account"
    | "Step 1.Select account.No selection"
    | "Step 1.Select account.Selected"
    | "Step 1.Select account.Selected.Service account"
    | "Step 1.Select account.Selected.Username"
    | "Step 1.Select account.Selected.New username"
    | "Step 1.Select account.Selected.All accounts"
    | "Step 2"
    | "Step 2.load ACLs"
    | "Step 2.Editing"
    | "Step 2.Editing.New ACLs"
    | "Step 2.Editing.New ACLs.Pristine"
    | "Step 2.Editing.New ACLs.ACLs added"
    | "Step 2.Editing.Existing ACLs"
    | "Step 2.Editing.Existing ACLs.Pristine"
    | "Step 2.Editing.Existing ACLs.Dirty"
    | "Step 2.Editing.History"
    | "Step 2.Confirm cancel"
    | "Step 2.Saving"
    | "Error"
    | "Closed"
    | {
        "Step 1"?:
          | "Loading users"
          | "Select account"
          | {
              "Select account"?:
                | "No selection"
                | "Selected"
                | {
                    Selected?:
                      | "Service account"
                      | "Username"
                      | "New username"
                      | "All accounts";
                  };
            };
        "Step 2"?:
          | "load ACLs"
          | "Editing"
          | "Confirm cancel"
          | "Saving"
          | {
              Editing?:
                | "New ACLs"
                | "Existing ACLs"
                | "History"
                | {
                    "New ACLs"?: "Pristine" | "ACLs added";
                    "Existing ACLs"?: "Pristine" | "Dirty";
                  };
            };
      };
  tags: "step-1" | "loading-users";
}
