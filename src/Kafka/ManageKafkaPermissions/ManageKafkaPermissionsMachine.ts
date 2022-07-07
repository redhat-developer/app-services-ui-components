import { createMachine } from 'xstate';
import { Account, NewAcl,AclBinding } from './types';

export const ManageKafkaPermissionsMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEEDCAZABAEQJYEMAbAeygDoBlAFzAAdMBGM9Y-CXAOykwFdYwATrADEEYhzBlOAN2IBrSWix4ipSjXpMWbTtz6DYCGcQDG+KrnEBtAAwBdRKFrFYuC+McgAHogCcAJgAaEABPPwBmfzIADgA2Bn9YmwAWcIBWG0TfAF9s4KUcAhJyajpGZlZ2Ll5+IWFBAWIBMlpCcwAzJoBbMgKVYvUyrUrdGoMjDlkzdw5bByQQZ1cZzx8EBgYbXzI0tIZfBmjfNOTd32Cw9djfAHYya5u06MSbWOvom9z8jELVEo1yhQwIQwCYqJh8CYTMQeBwqJRgaCaBBhAA5MBeKieJZuSwcVaIDZbHZ7A5HE5nC6E5I3GxkRKJNKxZ7JFKRL4gPpFNSlTQIkFgiFQmFw-lIyDCVAg-ACTD8AUrBY4xWgNaxNLbaI2LW+XW7G7Xc6hQnhDZkG4HU0MZL+RLq8Icrl-QZ8oEKoXQ2FUYTIQiED0iqiwTAAd1whAgZgEEGxLlxHgWawSNyp61ZaXppxsW1O0Ui1sdP36PIBTDdSIDXuEABUQrQwGMBBx8F0wLHlniCet-CnjWmAvSbAxYjcGKbXslfA68pyi9z-kMxYLIZ64cJy4L9LL2o0uphCLhYFilXGVd5CT3Uww0hayNfnv5Uh8s-5C8p5y7AYjl8KqxvwbU0i4CYDYroGmA7sQe4Hke7bxviiYXr2lxjoc9LRHmNJJBqU6fDOToDLyjCSvgHAgYQcFnkmmzbLs+yHMcpwaqmvh0r41yHDaNjpAkzJvr8hEAlEJBsJgSgiGIEhSJM8iKHOzpEcJlRiRghjGNMeJzJRnaIWm4R0v42bMtx-hMpSfZMlE0S7HE6rcXEiT8cWC70EponifUAiNM0rQdN0vTyYJZRuRAKnoGpMkadY9jaQmqqIIkRwxIchm2uk8TRKm4SsmQNrJMk6p5SkupOR+ilkAAouwFhcGQ6IhmFsABeFEIQBAErYIiNBhbFCHxQg-gJOE5rJNZo2sikzypjcM33Bq16xP4tw2Ls07fO+ClCZV1W6HVYANR5yBtWFmBdKRPBEIQlxOKeOn9cOST3Kkto0TcS35dNHwjYtWxJHmBprbOG1Ba5224rV9WNT6x34Jg0IcLAPCthBu4QpgVDELQwE9SeHZxeeVyPbEz2DVsb2+B9fbPuamQGolewzaVm3BWDNXkJDh0w5gtCNBAPAgejxBoxjWMmDjN1431BMPXSxORKTtzvckLHxHNU7Xga+wzXh60CSWLNVeD7P7VDR2hWdzYwB6cDBkovVdjLT3y69SvTdm5pHOq9oa7sTMg5gUSG2zlVeIebNQ51ILdRiYejHbuPwQ7byyyTLsU8rfZDbEJLppNryHLEfv66DQe6CRZHAvbumJZqKWZP46WHFlGFkOEFN0bc8SpGkRcuQHrNlxQ+DSG2CdUdSbc7KZNzRFraRt8h1KPrlM9vLcaSPoDBHF-3qDiO0uACHuZgV4QwgAPIcHD++H10Vf9TXyXPPXjeZX2pO5Scto3DSxwaqcvdPxRD3hwA+R84akXIhfK+J9yL32lqkAyRktSRDMsxPspxtisWONqWk2Z2I6yBnrPuUQh5AS4KIcQkhjAKGasQoBlBh66AmFMcwmkYpjzugTR+s9n5pSZE3CyTx0JLVYgaN60QbSAPKmQsuDQmgtDaFQToR86HOQYbIrgLDTBsOivMCWiddLWiWlPG8s914LyvPpZIZBdTpFpNZUy2Vcgzg4MQdq8AFjbz7sMHQ1QtyeIMePBAb1UxJDYokcI1lwimg+NEaRpYlzgjAl6OqQt5RIi4cqLhaw4jDVuAVPM39bJWNMuhDINpdivBWvE-CgUd5lm-Mk38op-yQARAIICAsUlwngWsG02xMg0mHFqJ4D4M4oWytsA0xwYk3hiUMhJi5-yVlaU09pABVWozZWx9MQAMsgQzRzGTGbaCZhJdjZxHKOYZxw3hxCWa6Jpqz4RtIgHtBqW4dmjyCTk-ZJijkjJqeMq8o07i0gtDaQqHxfC1N1uooijT3Q9Nees95vp-QosCYsW6+N+kAsfMc0ZGEzmgrQjcKJFLZ7Wi2BsR5X5kUtNRQqSAeyEDpkOYSoFpzHxXh7NnLUJklpPBWj3OpwMGlJJeWyzY4Qrz0RiOOGa6R8olXFfQxFbLRqpg3ncY4b17IUt2MkBg9KQqNRlbabOE5f75UZMOHV1pzQMDpkOJkrJiZmoHhDE24kyAAAUBCxwkGyhu89DkJACHE20aRPrRDvCamas8FZvC9aXH1B1VLNWDGwdqMZOF4sJDgu86RTQmtVdqN+lwtRXPCMZVI1j4hpp2hmi1BapZJliHWp2L0yauz7PEDMz8aQZApaZYczajYh2DdwP1gbg0-JxZLB2BwmCJGHBTTIgiULDjuE8ScGp1TsVhYXdVCKtrpvIBVUOR445ZrwAIKg10l2GIfvpO4Q4Dg2ApRsJafL1Q7FidcLYUT-BwqIeeg2Lar03vDuJGVXarmpz7enK82ooiDskQ3AqSQ+JnrKhe6DZAAASYcmjPuyYWq4pwe0K3JpTS4uwrJ7DHHEH+NJtSTrZghhItG04Mf2beDCWthncSHCtL1ICwHH0gZXdtDsrWHOJraqFexYipnyhmH+kiFq6Z-lvepJDGHkKgJaxISn8qQtUw6zOo1s6EseDeBuU4cj4eZq5S1mQLMqftepvsZbzTq02IKnsAC3MDAql5JoobWLDUyCKqccRni3CysvWlK0T20i7YAqULhWXyerkcOLpkdRROZEtRe6whx3iSHW0aw4lpdtfOF0gobznrHjdmLroW9gYQtGK3IQA */
createMachine({
  context: { account: undefined, availableUsersAndAccounts: [], addedAcls: [],existingAcls:[] },
  tsTypes: {} as import("./ManageKafkaPermissionsMachine.typegen").Typegen0,
  schema: {
    context: {} as {
      account: string | undefined;
      availableUsersAndAccounts: Account[];

      addedAcls: NewAcl[]
      existingAcls:AclBinding[]
    },
    events: {} as
      | { type: "Cancel" }
      | { type: "Next" }
      | { type: "Save" }
      | { type: "Clear selection" }
      | { type: "Select service account from list"; account: string }
      | { type: "All accounts wildcard" }
      | { type: "Type username"; username: string }
      | { type: "Select user from list"; username: string }
      | { type: "Delete ACL"; aclIndex: number }
      | { type: "Add ACL manually" }
      | { type: "Add a consume from a topic ACL" }
      | { type: "Add a produce to a topic ACL" }
      | { type: "Add manage access ACL" }
      | { type: "Delete existing ACL"; aclIndex: number }
      | { type: "On confirm" }
      | { type: "On cancel" },
    services: {} as {
      loadUsersAndServiceAccounts: {
        data: Account[];
      };
    },
  },
  id: "ACL Dialog",
  initial: "Step 1",
  states: {
    "Step 1": {
      tags: "step-1",
      initial: "Loading users",
      states: {
        "Loading users": {
          invoke: {
            src: "loadUsersAndServiceAccounts",
            onDone: [
              {
                actions: "setAvailableUsersAndAccounts",
                target: "Select account",
              },
            ],
            onError: [
              {
                target: "#ACL Dialog.Error",
              },
            ],
          },
          tags: "loading-users",
        },
        "Select account": {
          initial: "No selection",
          states: {
            "No selection": {},
            Selected: {
              initial: "All accounts",
              states: {
                "Service account": {},
                Username: {},
                "New username": {},
                "All accounts": {},
              },
              on: {
                Next: {
                  target: "#ACL Dialog.Step 2",
                },
                "Clear selection": {
                  actions: "clearSelectedAccount",
                  target: "No selection",
                },
              },
            },
          },
          on: {
            "All accounts wildcard": {
              actions: "setWildcardAccount",
              target: ".Selected.All accounts",
            },
            "Type username": {
              actions: "setSelectedUsername",
              target: ".Selected.New username",
            },
            "Select user from list": {
              actions: "setSelectedUsername",
              target: ".Selected.Username",
            },
            "Select service account from list": {
              actions: "setSelectedAccount",
              target: ".Selected.Service account",
            },
          },
        },
      },
      on: {
        Cancel: {
          target: "Closed",
        },
      },
    },
    "Step 2": {
      description: "We store the ACLs we got in some internal state (context)",
      initial: "load ACLs",
      states: {
        "load ACLs": {
          invoke: {
            src: "loadACLs",
            onDone: [
              {
                target: "Editing",
              },
            ],
            onError: [
              {
                target: "#ACL Dialog.Error",
              },
            ],
          },
        },
        Editing: {
          type: "parallel",
          states: {
            "New ACLs": {
              initial: "Pristine",
              states: {
                Pristine: {
                  description: "No new ACLs have been added",
                },
                "ACLs added": {
                  on: {
                    "Delete ACL": {
                      cond: "acls count == 0",
                      target: "Pristine",
                    },
                  },
                },
              },
              on: {
                "Add ACL manually": {
                  actions: "addRawAcl",
                  target: ".ACLs added",
                },
                "Add a consume from a topic ACL": {
                  actions: "addConsumeTopicTemplateAcl",
                  target: ".ACLs added",
                },
                "Add a produce to a topic ACL": {
                  actions: "addProduceTopicTemplateAcl",
                  target: ".ACLs added",
                },
                "Add manage access ACL": {
                  actions: "addManageAccessTemplateAcl",
                  target: ".ACLs added",
                },
              },
            },
            "Existing ACLs": {
              initial: "Pristine",
              states: {
                Pristine: {},
                Dirty: {},
              },
              on: {
                "Delete existing ACL": {
                  cond: 'acl user matches the selected one in step 1 OR selected user is "all accounts"',
                  target: ".Dirty",
                },
              },
            },
            History: {
              history: "deep",
              type: "history",
            },
          },
          on: {
            Cancel: [
              {
                cond: "pristine",
                target: "#ACL Dialog.Closed",
              },
              {
                cond: "dirty",
                target: "Confirm cancel",
              },
            ],
            Save: {
              target: "Saving",
            },
          },
        },
        "Confirm cancel": {
          on: {
            "On confirm": {
              target: "#ACL Dialog.Closed",
            },
            "On cancel": {
              target: "#ACL Dialog.Step 2.Editing.History",
            },
          },
        },
        Saving: {
          invoke: {
            src: "saveAcls",
            onDone: [
              {
                target: "#ACL Dialog.Closed",
              },
            ],
            onError: [
              {
                target: "#ACL Dialog.Step 2.Editing.History",
              },
            ],
          },
        },
      },
    },
    Error: {
      description:
        "Show an inline alert at the top of the form informing the user to try again later",
    },
    Closed: {
      type: "final",
    },
  },
})