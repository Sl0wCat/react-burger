import userFeedSlice, { initialState, ufConnected, ufConnecting, ufDisconnect, ufError, ufFetchOrdersFeed } from "./userFeed";



describe("tests for User Feed Slice", () => {


    it("initialize with initialValue", () => {
        const feedSliceInit = userFeedSlice.reducer(initialState, { type: "unknown" });
        expect(feedSliceInit).toBe(initialState);
    });

    it("set connecting", () => {
        const action = {
            type: ufConnecting.type,
        }
        const state = userFeedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isConnecting: true, isEstablishingConnection: true});
    });

    it ("set connected", () => {
        const action = {
            type: ufConnected.type,
        }
        const state = userFeedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isConnecting: false, isConnected: true, isEstablishingConnection: true});
    })

    it ("set disconnect", () => {
        const action = {
            type: ufDisconnect.type,
        }
        const state = userFeedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, isConnecting: false, isConnected: false, isEstablishingConnection: false});
    })

    it("fetch user orders feed", () => {
        const testData = {
            "success": true,
            "orders": [
              {
                "ingredients": [
                  "60d3463f7034a000269f45e7",
                  "60d3463f7034a000269f45e9",
                  "60d3463f7034a000269f45e8",
                  "60d3463f7034a000269f45ea"
                ],
                "_id": "",
                "status": "done",
                "number": 0,
                "createdAt": "2021-06-23T14:43:22.587Z",
                "updatedAt": "2021-06-23T14:43:22.603Z"
              }
            ],
            "total": 1,
            "totalToday": 1
        } 
        const action = {
            type: ufFetchOrdersFeed.type,
            payload: testData
        }
        const state = userFeedSlice.reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ...testData
        });
    });

    it("set error", () => {
        const action = {
            type: ufError.type,
            payload: 'test error message'
        }
        const state = userFeedSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, connectionError: 'test error message'});
    });

});