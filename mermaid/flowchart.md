graph TD
    A[reducer] -->|current state, action to be performed, and any necessary data| B(Parse out which action to perform )
    B -->|switch on action.type| C(perform the appropriate modifications)
    C -->|A| D[changes object]
    C -->|...| D
    C -->|Z| D
    D --> E(Merge changes with state)
    E --> |newState|F(store in AsyncStorage)
    F --> G(return newState)
